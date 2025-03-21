import {ExternalLink} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {CardBody, CardContainer, CardItem} from "./ui/3d-card";
import {AspectRatio} from "./ui/aspect-ratio";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Reveal} from "@/components/reveal";

interface ProjectCardProps {
  title: string,
  type: string,
  description: string,
  imageUrl: string,
  githubUrl?: string,
  demoUrl?: string,
  skills?: string[],
  details?: string[],
  index:number
}

export function ProjectCard3d({
                                title,
                                type,
                                description,
                                imageUrl,
                                githubUrl,
                                demoUrl,
                                skills,
                                details,
                                index
                              }: ProjectCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto w-auto rounded-xl p-6 border">
        <CardItem
          translateZ="100"
          rotateX={20*(index%2===0?-1:1)}
          rotateZ={-8*(index%2===0?-1:1)}
          className="w-full mt-4">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl">
            <Image
              src={imageUrl}
              alt="Project Image"
              fill
              className="object-cover rounded-xl group-hover/card:shadow-xl"
            />
          </AspectRatio>
        </CardItem>
        <CardItem
          as="h3"
          translateZ="60"
          className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4"
        >
          {title}
        </CardItem>
        <CardItem
          as="div"
          translateZ="60"
          className="text-sm text-muted-foreground"
        >
          {type}
        </CardItem>
        <CardItem
          as="div"
          translateZ="50"
          className="leading-7 [&:not(:first-child)]:mt-6"
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
        </CardItem>
        {skills && (
          <CardItem
            translateZ="40"
            className="flex gap-2 flex-wrap mt-6"
          >
            {skills.map((skill) => (
              <Badge key={skill+"3DBadge"} variant="default">{skill}</Badge>
            ))}
          </CardItem>
        )}
        <div className="flex justify-between items-center mt-10">
          {githubUrl && (
            <CardItem
              translateZ={30}
            >
              <Link href={githubUrl} target="_blank" passHref>
                <Button variant="link">
                  Link To Github
                  <ExternalLink className="ml-2"/>
                </Button>
              </Link>
            </CardItem>
          )}
          {demoUrl && (
            <CardItem
              translateZ={30}
            >
              <Link href={demoUrl} target="_blank" passHref>
                <Button>
                  Live URL
                  <ExternalLink className="ml-2"/>
                </Button>
              </Link>
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  )
}
