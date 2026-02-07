import { UploadWidgetValue } from "@/types";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-day-picker";



const UploadWidget = ({ value = null, onChange, disabled = false }) => {

    const widgetRef = useRef<CloudinaryWidget | null>(null);
    const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
    const [deleteToken, setDeleteToken] = useState<string | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        setPreview(value);
        if (!value) setDeleteToken(null);
    }, [value]);

    useEffect(() => {
        onChangeRef.current = onChange;
    })

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializeWidget = () => {
            if (!window.cloudinary || widgetRef.current) return;

            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
                uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
                folder: 'uploads',
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                maxFileSize: 5 * 1024 * 1024,
            }, (error, result) => {
                if (!error && result && result.event === 'success') {
                    const payload = {
                        url: result.info.secure_url,
                        publicId: result.info.public_id,
                    };
                    setPreview(payload);
                    setDeleteToken(result.info.delete_token ?? null);

                    onChangeRef.current?.(payload);
                }

            });

            return true;
        }

        if (initializeWidget()) return;

        const intervalId = window.setInterval(() => {
            if (initializeWidget()) {
                window.clearInterval(intervalId);
            }
        }, 500);

        return () => clearInterval(intervalId);

    }, []);

    const openWidget = () => {
        if (!disabled) widgetRef.current?.open();
    }

    const removeFromCloudinary = async () => { }

    return (
        <div className="space-y-2">
            {
                preview ? (
                    <div className="upload-preview">
                        <img src={preview.url} alt="Preview" />
                    </div>
                ) : <div className="upload-dropzone" role="button" tabIndex={0}
                    onClick={openWidget}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            openWidget();
                        }
                    }}>
                    <div className="upload-prompt">
                        <UploadCloud className="icon" />
                        <p className="text-sm font-medium">Click to upload Image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF or WebP up to 5MB</p>
                    </div>

                </div>

            }
        </div>
    );
};
export default UploadWidget;
