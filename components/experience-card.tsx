import {Reveal} from "./reveal";
import {Badge} from "./ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

interface ExperienceCardProps {
  article?: any,
  company: string,
  date: string,
  description: string,
  details?: string[],
  skills?: string[],
  title: string,
  url?: string
}

export function ExperienceCard({title, company, date, description, skills, details,url,article}: ExperienceCardProps) {
    return (
        <Card className="w-full">
            <Reveal
                initial={{opacity: 0, y: -50}}
                whileInView={{opacity: 1, y: 0, transition: {duration: 0.4}}}
            >
                <CardHeader>
                  <CardTitle className="font-bold">{title}</CardTitle>
                  {url ?
                    <CardTitle>
                      <a
                        href={url}
                        className="font-normal hover:text-blue-600 hover:no-underline"
                      >
                        {company}
                      </a>
                    </CardTitle>
                    :<CardTitle className="font-normal">{company}</CardTitle>}
                  <CardDescription>{date}</CardDescription>
                  {article &&
                    <CardDescription>
                      <a
                        href={article.url}
                        className="font-medium underline hover:text-blue-600 dark:text-blue-500 hover:no-underline"
                      >
                        {article.title}
                      </a>
                    </CardDescription>
                  }
                </CardHeader>
            </Reveal>
            <CardContent className="flex flex-col gap-4">
                <Reveal
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0, transition: {duration: 0.4}}}
                >
                  <Collapsible>
                    <CollapsibleTrigger ><p className="leading-7 font-bold hover:text-blue-500 ">{description}</p></CollapsibleTrigger>
                    <CollapsibleContent>
                      <Reveal
                        initial={{opacity: 0, y: -25}}
                        whileInView={{opacity: 1, y: 0, transition: {duration: 0.4}}}
                      >
                        <ul className="list-disc text-justify space-y-3 p-4">
                          {details && details.map((detail, index) => (
                            <li key={"detail_" + index}>{detail}</li>
                          ))}
                        </ul>
                      </Reveal>
                    </CollapsibleContent>
                  </Collapsible>

                </Reveal>

              {skills && (
                    <div className="flex gap-2 flex-wrap">
                        {skills.map((skill, index) => (
                            <Reveal
                                key={skill+"Reveal"}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0, transition: {duration: 0.1, delay: index / 40}}}
                            >
                                <Badge variant="default">{skill}</Badge>
                            </Reveal>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
