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

    const placeholderUrl = `https://placeholder.co/600x400?text=${encodeURIComponent(teacherInitials || 'NA')}`;

    const { bannerUrl, bannerCldPubId, teacher, subject, department, name, description, inviteCode, capacity, status, } = classDetails;





    return (
        <ShowView className="class-view class-show">
            <ShowViewHeader resource='classes' title='Class Details' />
            <div className='banner-section'>
                {bannerUrl ? (
                    <AdvancedImage
                        alt={name} cldImg={bannerPhoto(bannerCldPubId ?? '', name)} />
                ) : <div className='placeholder' />}
                <Card>
                    <div className='details-card'>
                        <div className='details-header'>
                            <h1 className='details-title'>{name}</h1>
                            <p className='details-description'>{description}</p>
                        </div>

                        <div>
                            <Badge variant="outline">{capacity} spots</Badge>
                            <Badge variant={status === "active" ? "default" : "secondary"} data-status={status}>
                                {status.toUpperCase()}
                            </Badge>
                        </div>
                    </div>
                    <div className='deatails-grid'>
                        <div className='instructor'>
                            <p>Instructor</p>
                            <div>
                                <img src={teacher?.image || placeholderUrl} alt={teacherName} />
                                <div>
                                    <p>{teacherName}</p>
                                    <p>{teacher?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='department'>
                            <p>Department</p>
                            <div>
                                <p>{department?.name}</p>
                                <p>{department?.description}</p>
                            </div>
                        </div>
                    </div>
                    <Separator />

                    <div className='subjects'>
                        <p>Subjects</p>
                        <div>
                            <Badge variant="outline">Code:{subject?.code}</Badge>
                            <p>{subject?.name}</p>
                            <p>{subject?.description}</p>
                        </div>
                    </div>

                    <Separator />

                    <div className='join-section'>
                        <h2>Join Class</h2>

                        <ol>
                            <li>Ask your instructor for the invite code <strong>{inviteCode}</strong></li>
                            <li>Enter the invite code when prompted</li>
                            <li>You will be added to the class</li>
                        </ol>
                    </div>

                    <Button size="lg" className='w-full'>Join Class</Button>


                </Card>

            </div>
        </ShowView>
    )
}

export default ClassesShow