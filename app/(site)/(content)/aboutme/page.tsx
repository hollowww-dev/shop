import aboutMePreval from '@/lib/aboutMe.preval'
import { urlFor } from '@/sanity/lib/image'

import ContactTable from '@/components/sections/aboutMe/contactTable'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'
import { Skeleton } from '@/components/shadcn/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/shadcn/table'

export default async function Page() {
    return (
        <main className="container mx-auto flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-12 p-3 justify-between items-center">
                <Avatar className="w-32 h-32 lg:w-48 lg:h-48 self-center lg:self-start">
                    <AvatarImage src={urlFor(aboutMePreval.avatar).width(400).height(400).url()} alt="Avatar Image" loading="lazy" />
                    <AvatarFallback>
                        <Skeleton className="w-32 h-32 lg:w-48 lg:h-48" />
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <h2>{aboutMePreval.headline}</h2>
                    <p className="lead">{aboutMePreval.description}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                    <h3>Informations</h3>
                    <Table>
                        <TableBody>
                            {aboutMePreval.information?.map((entry) => (
                                <TableRow key={entry._key}>
                                    <TableCell className="font-medium w-1/3">{entry.key}</TableCell>
                                    <TableCell className="w-2/3">{entry.value?.map((line, index) => <p key={index}>{line}</p>)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                    <h3>Contact</h3>
                    <ContactTable contact={aboutMePreval.contact} />
                </div>
            </div>
        </main>
    )
}
