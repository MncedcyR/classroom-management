import { useShow } from '@refinedev/core'
import { ClassDetails } from '@/types';
import { ShowView, ShowViewHeader } from '@/components/refine-ui/views/show-view';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { bannerPhoto } from '@/lib/cloudinary';
import { AdvancedImage } from '@cloudinary/react';

const ClassesShow = () => {

    const { query } = useShow<ClassDetails>({ resource: "classes" });

    const classDetails = query.data?.data;
    const { isLoading, isError } = query;

    if (isLoading || !classDetails || isError) {
        return (
            <ShowView className="class-view class-show">
                <ShowViewHeader resource='classes' title='Class Details' />

                <p>
                    {isLoading ? "Loading class details..."
                        : isError ? "Failed to load class details..."
                            : "No class details found"}
                </p>
            </ShowView>
        )
    }

    const teacherName = classDetails.teacher?.name ?? 'Unknown';
    const teacherInitials =
        teacherName
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join('')

    // const placeholderUrl = `https://placeholder.co/600x400?text=${encodeURIComponent(teacherInitials || 'NA')}`;
    const placeholderUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
            <rect width='160' height='160' fill='#E5E7EB'/>
            <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' fill='#6B7280' font-size='48' font-family='sans-serif'>
                ${teacherInitials || 'NA'}
            </text>
        </svg>`
    )}`;

    const { bannerUrl, bannerCldPubId, teacher, subject, department, name, description, capacity, status, } = classDetails;





    return (
        <ShowView className="class-view class-show space-y-6">
            <ShowViewHeader resource="classes" title="Class Details" />

            <div className="banner">
                {bannerUrl ? (
                    bannerUrl.includes("res.cloudinary.com") &&
                        bannerCldPubId ? (
                        <AdvancedImage
                            cldImg={bannerPhoto(
                                bannerCldPubId ?? "",
                                name
                            )}
                            alt="Class Banner"
                        />
                    ) : (
                        <img
                            src={bannerUrl}
                            alt={name}
                            loading="lazy"
                        />
                    )
                ) : (
                    <div className="placeholder" />
                )}
            </div>

            <Card className="details-card">
                {/* Class Details */}
                <div>
                    <div className="details-header">
                        <div>
                            <h1>{name}</h1>
                            <p>{description}</p>
                        </div>

                        <div>
                            <Badge variant="outline">{capacity} spots</Badge>
                            <Badge
                                variant={
                                    status === "active" ? "default" : "secondary"
                                }
                                data-status={status}
                            >
                                {status.toUpperCase()}
                            </Badge>
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="instructor">
                            <p>👨‍🏫 Instructor</p>
                            <div>
                                <img
                                    src={teacher?.image ?? placeholderUrl}
                                    alt={teacherName}
                                />


                                <div>
                                    <p>{teacherName}</p>
                                    <p>{teacher?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="department">
                            <p>🏛️ Department</p>

                            <div>
                                <p>{department?.name}</p>
                                <p>{department?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Subject Card */}
                <div className="subject">
                    <p>📚 Subject</p>

                    <div>
                        <Badge variant="outline">
                            Code: <span>{subject?.code}</span>
                        </Badge>
                        <p>{subject?.name}</p>
                        <p>{subject?.description}</p>
                    </div>
                </div>

                <Separator />
                {/* Join Class Section */}
                <div className="join">
                    <h2>🎓 Join Class</h2>
                    <ol>
                        <li>Ask your teacher for the invite code.</li>
                        <li>Click on &quot;Join Class&quot; button.</li>
                        <li>Paste the code and click &quot;Join&quot;</li>
                    </ol>
                </div>

                <Button size="lg" className="w-full">
                    Join Class
                </Button>
            </Card>
        </ShowView>
    );
};


export default ClassesShow