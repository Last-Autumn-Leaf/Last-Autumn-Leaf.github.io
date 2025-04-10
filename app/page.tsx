'use client'

import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard3d } from "@/components/project-card-3d";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import experiences from "@/lib/experiences.json";
import skills from "@/lib/skills.json";
import me from "@/public/me.jpeg";
import projects from "@/lib/projects.json";
import { AtSign, Github, Linkedin } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import {LeetCodeData} from "@/types/api";
import { ImSpinner9 } from "react-icons/im";
import {LeetcodeScore} from "@/components/leetcodeScore";


export default function Home() {
  const [basePath, setCurrentUrl] = useState('');
  const [leetCodeData, setData] = useState<LeetCodeData | null| undefined>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leetcode');

        if (!response.ok) {
          setData(undefined);
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result?.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Safe to use `window` here because `useEffect` only runs on the client
    setCurrentUrl(window.location.href);
  }, []);
    const name = [
      { text: "Carl-André" },
      { text: "or" },
      { text: "Carlos" },
    ]

    return (
        <div className="flex flex-col overflow-x-hidden">
            {/* Hero */}
            <header className="flex flex-col sm:flex-row h-screen w-full justify-center items-center gap-4 mt-16">
                <div className="flex flex-col gap-2 w-full">
                    <TypewriterEffectSmooth words={name} />
                    <Reveal
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
                    >
                        <div className="scroll-m-20 text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                            Electrical & Software Engineer
                        </div>
                    </Reveal>
                    <Reveal
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } }}
                    >
                        <div className="leading-7">
                          I plan, design, build, test and deploy software.
                          <br/>
                          Got the sweetest tooth for chocolate
                        </div>
                    </Reveal>
                    <div className="flex gap-4">
                        <TooltipProvider>
                            <Reveal
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href="https://www.linkedin.com/in/carl-andré-gassette/" target="_blank">
                                            <Button variant="secondary" size="icon">
                                                <Linkedin />
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Reveal>
                          {false && <Reveal
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0, transition: {duration: 0.4, delay: 0.2}}}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link href="#" target="_blank">
                                  <Button variant="secondary" size="icon">
                                    <Github/>
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Github</p>
                              </TooltipContent>
                            </Tooltip>
                          </Reveal>}
                            <Reveal
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } }}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href="mailto:gasc3203@usherbrooke.com" target="_blank">
                                            <Button variant="secondary" size="icon">
                                                <AtSign />
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Reveal>
                          <Reveal
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } }}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link href="https://leetcode.com/u/Last-Autumn-Leaf/" target="_blank">
                                  <Button variant="secondary" size="icon">
                                    <SiLeetcode />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Leetcode</p>
                              </TooltipContent>
                            </Tooltip>
                          </Reveal>
                        </TooltipProvider>
                    </div>
                  {leetCodeData  ?
                    <div className="border rounded-2xl border-gray-600 p-4">
                      <h1>Leetcode Stats</h1>
                      <div className="mt-4 flex flex-col space-y-3">
                        {
                          leetCodeData.languageStats.languageProblemCount.map(({languageName, problemsSolved}, index) =>
                            <div key={languageName}
                                 className="flex items-center justify-between text-xs ">
                                <span
                                  className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-[#000a200d] dark:bg-[#ffffff1a] notranslate"
                                >
                                  {languageName}
                                </span>
                              <div><b>{problemsSolved}</b> problems solved</div>
                            </div>
                          )
                        }
                      </div>
                      <LeetcodeScore res={leetCodeData.userProfileUserQuestionProgressV2} />
                    </div>
                    :
                    (
                      typeof leetCodeData !== 'undefined' && (
                        <div className="flex justify-center items-center mt-4">
                          <ImSpinner9 className="w-12 h-12 text-blue-500 animate-spin-slow" />
                        </div>)
                      )
                  }
                </div>
                <div className="relative w-full h-1/2 rounded-lg overflow-hidden">
                  <Image
                    src={me}
                    alt="Me"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
            </header>
          <Separator/>
          {/* About */}
          <section className="flex flex-col items-start justify-start gap-4 sm:py-32 py-16">
            <h2 id="about" className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                    About Me
                </h2>
                <Reveal
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
                >
                  <p className="leading-7">
                    I am a person who loves to create, and since I was young, programming has always satisfied this
                    need. By following tutorials, I was able to create my first website at 14 years old. Fast forward 10
                    years later.
                    I am now a graduate of the Faculty of Electrical Engineering at INSA Lyon and hold a master's degree
                    in Electrical and Computer Engineering with a focus on Artificial Intelligence.
                    <br/>
                    <br/>
                    During my studies, I had the opportunity to work on a research project where I implemented and
                    deployed multiple "keyword-spotting" models using CNN. This experience allowed me to develop my
                    skills in the PyTorch and TensorBoard libraries and to train the models on the dedicated research
                    servers at "Calcul Canada." Furthermore, I have prior experience with computer vision for tasks such
                    as classification, detection, and segmentation.
                    <br/>
                    I also had the chance to design and develop the interface for a calculation and visualization test
                    bench, which is still used today to calibrate and adjust flow sensors in France and Europe.
                    <br/>
                    <br/>
                    Today, I work as a full-stack developer in Montreal and continue to train myself, hoping to one day
                    start my own company.
                    When I'm not coding, I usually play games, play volleyball or binge-watch Youtube videos.
                  </p>
                </Reveal>
          </section>
            <Separator />
            {/* Experience */}
            <section id="experiences" className="flex flex-col items-start justify-start gap-4 sm:py-32 sm:mx-24 md:mx-32 lg:mx-64 xl:mx-96 py-16">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-center w-full">
                    Where I've Worked
                </h2>
                <div className="flex flex-col gap-4 md:hidden">
                    {experiences.map((experience) => (
                        <ExperienceCard
                            key={experience.title}
                            title={experience.title}
                            company={experience.company}
                            date={experience.date}
                            description={experience.description}
                            skills={experience.skills}
                        />
                    ))}
                </div>
                <TracingBeam className="px-6 hidden md:flex md:flex-col">
                    <div className="flex flex-col gap-4">
                        {experiences.map((experience) => (
                            <ExperienceCard
                                key={experience.title}
                                title={experience.title}
                                company={experience.company}
                                date={experience.date}
                                description={experience.description}
                                skills={experience.skills}
                                details={experience.details}
                                url={experience.url}
                                article={experience.article}
                            />
                        ))}
                    </div>
                </TracingBeam>
            </section>
            <Separator />
            {/* Projects */}
            <section id="projects" className="flex flex-col items-center justify-center gap-4 sm:py-32 py-16">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                    Projects Done
                </h2>
                <div className="flex flex-row flex-wrap gap-x-4 justify-evenly">
                    {projects.map((projects, project_index) => (
                        <Reveal
                            key={projects.title}
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: project_index / 30 } }}
                        >
                            <ProjectCard3d
                                title={projects.title}
                                type={projects.type}
                                description={projects.description}
                                imageUrl={projects.imageUrl.startsWith("http")? projects.imageUrl : `${basePath}/${projects.imageUrl}`}
                                githubUrl={projects.githubUrl}
                                demoUrl={projects.demoUrl}
                                skills={projects.skills}
                                details={projects.details}
                                index={project_index}
                            />
                        </Reveal>
                    ))}
                </div>
            </section>
            <Separator />
            {/* Skills */}
          <section id="skills" className="flex flex-col items-center justify-center gap-4 sm:py-32 py-20">
            <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
              Skills & Tools
            </h2>
            <p className="leading-7 text-center">
              My primary focus lies in artificial intelligence.But Full-stack is the way to go xD.
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 items-start">
              {Object.entries(skills).map(([category, items],skill_index)=>(
                <Reveal
                  initial={{opacity: 0, y: 50}}
                  whileInView={{opacity: 1, y: 0, transition: {duration: 0.4 +0.2*skill_index}}}
                  key={category+skill_index.toString()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      {category.replace("_"," ")}
                    </h3>
                    <div className="flex flex-row flex-wrap justify-center gap-4">
                      {items.map((item) => (
                        <div
                          key={item}
                          className="flex flex-col items-center justify-center">
                          <div className="flex p-2 w-[100px] h-[100px] dark:bg-white dark:rounded-lg">
                            <Image
                              src={`https://cdn.worldvectorlogo.com/logos/${item}.svg`}
                              alt={item + " logo"}
                              width={100}
                              height={100}
                              style={{ objectFit: 'fill' }}
                              className="object-contain"
                            />
                          </div>
                          {/*<p className="text-sm text-muted-foreground">{item}</p>*/}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </section>
          <Separator/>
          {/* Contact */}
          <section id="contact" className="flex flex-col items-center justify-center gap-4 sm:py-48 py-24">
            <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
              Get In Touch
            </h2>
            <Reveal
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0, transition: {duration: 0.4}}}
            >
              <p className="leading-7">
                If you'd like to get in touch with me, feel free to reach out on LinkedIn or my email and I'll get back
                to you whenever I can.
              </p>
            </Reveal>
            <div className="flex gap-4">
              <Reveal
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0, transition: {duration: 0.4, delay: 0.1}}}
              >
                <Link href="mailto:gasc3203@usherbrooke.ca" target="_blank">
                  <button
                    className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                Say Hi!
                            </button>
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    )
}
