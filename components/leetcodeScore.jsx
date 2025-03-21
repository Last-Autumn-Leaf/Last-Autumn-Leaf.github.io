"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {useState} from "react";

const chartConfig = {
  easySolved: {
    label: "Easy Solved",
    color: "var(--teal-400)",
  },
  easyOther: {
    label: "Easy Unsolved",
    color:"var(--teal-100)",
  },
  mediumSolved: {
    label: "Medium Solved",
    color: "var(--amber-400)",
  },
  mediumOther: {
    label: "Medium Unsolved",
    color: "var(--amber-200)",
  },
  hardSolved: {
    label: "Hard Solved",
    color: "var(--red-500)",
  },
  hardOther: {
    label: "Hard Unsolved",
    color: "var(--red-200)",
  }
};

const aggregateCountsByDifficulty = (categories) => {
  return categories.reduce((acc, category) => {
    category.forEach(({ count, difficulty }) => {
      if (!acc[difficulty]) {
        acc[difficulty] = 0;
      }
      acc[difficulty] += count;
    });
    return acc;
  }, {});
};
export function LeetcodeScore({res}) {
  const [selected, setSelected] = useState("");

  const totalSolved = res.numAcceptedQuestions.reduce((sum, item) => sum + item.count, 0);
  const totalOtherQuestions = [
    ...res.numUntouchedQuestions,
    ...res.numFailedQuestions
  ].reduce((sum, item) => sum + item.count, 0);
  const totalProblems = totalSolved + totalOtherQuestions;

  const acceptedCounts = aggregateCountsByDifficulty([res.numAcceptedQuestions]);
  const failedCounts = aggregateCountsByDifficulty([res.numFailedQuestions]);
  const untouchedCounts = aggregateCountsByDifficulty([res.numUntouchedQuestions]);

// Combine the counts
  const countsByDifficulty = [{
    easySolved: acceptedCounts["EASY"] || 0,
    easyOther: (failedCounts["EASY"] || 0) + (untouchedCounts["EASY"] || 0),
    mediumSolved: acceptedCounts["MEDIUM"] || 0,
    mediumOther: (failedCounts["MEDIUM"] || 0) + (untouchedCounts["MEDIUM"] || 0),
    hardSolved: acceptedCounts["HARD"] || 0,
    hardOther: (failedCounts["HARD"] || 0) + (untouchedCounts["HARD"] || 0),
  }];
  const percentage = res.userSessionBeatsPercentage.reduce((acc, { difficulty, percentage }) => {
    acc[difficulty] = percentage.toString();
    return acc;
  }, {});

  return (
    <div>

      <div className="flex w-full gap-2 max-h-[300px] items-center">

        <div className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto w-full max-h-[200px] "
          >
            <RadialBarChart
              data={countsByDifficulty}
              startAngle={-50}
              endAngle={230}
              innerRadius={80}
              outerRadius={95}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) }
                            className={"fill-foreground text-lg " + (selected==="" && "text-2xl font-bold")}
                          >
                            {selected==="" ? totalSolved:"Beats"}
                            {selected==="" &&
                              <tspan className="fill-foreground text-lg font-normal">
                                /{totalProblems}
                              </tspan>
                            }
                          </tspan>

                            {selected === "" ?
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 16}
                                className="fill-muted-foreground"
                              >
                                solved
                              </tspan> :
                                <>
                                  <tspan
                                    x={(viewBox.cx || 0) -10}
                                    y={(viewBox.cy || 0) + 20}
                                    className="text-2xl font-bold fill-muted-foreground"
                                  >
                                    {percentage[selected].split(".")[0]}.
                                  </tspan>
                                  <tspan
                                    x={(viewBox.cx || 0)+ 20}
                                    y={(viewBox.cy || 0) + 20}
                                    className="fill-muted-foreground"
                                  >
                                    {percentage[selected].split(".")[1]}%
                                  </tspan>
                                </>
                            }
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              {(selected === "" || selected==="HARD")  &&
                <>
                  <RadialBar
                    dataKey="hardOther"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-hardOther)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="hardSolved"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-hardSolved)"
                    className="stroke-transparent stroke-2"
                  />
                </>
              }
              {(selected==="" || selected==="MEDIUM")  &&
                <>
                  <RadialBar
                    dataKey="mediumOther"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-mediumOther)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="mediumSolved"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-mediumSolved)"
                    className="stroke-transparent stroke-2"
                  />
                </>
              }
              {(selected==="" || selected==="EASY")  &&
                <>
                  <RadialBar
                    dataKey="easyOther"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-easyOther)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="easySolved"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-easySolved)"
                    className="stroke-transparent stroke-2"
                  />
                </>
              }
            </RadialBarChart>
          </ChartContainer>
        </div>

        <div className="flex h-full w-[90px] flex-none flex-col gap-2">
          <div
            onMouseEnter={()=>setSelected("EASY")}
            onMouseLeave={()=>setSelected("")}
            className="rounded-sm flex flex-1 flex-col items-center justify-center gap-0.5 shadow-[unset]  bg-[#000a200d] dark:bg-[#ffffff1a] w-full p-2">
            <div className="text-xs font-medium text-teal-400">Easy</div>
            <div className="text-sd-foreground text-xs">
              {countsByDifficulty[0].easySolved}/{countsByDifficulty[0].easySolved + countsByDifficulty[0].easyOther}
            </div>
          </div>
          <div
            onMouseEnter={()=>setSelected("MEDIUM")}
            onMouseLeave={()=>setSelected("")}
            className="rounded-sm flex flex-1 flex-col items-center justify-center gap-0.5 shadow-[unset] bg-[#000a200d] dark:bg-[#ffffff1a] w-full p-2">
            <div className="text-xs font-medium text-amber-400">Med.</div>
            <div className="text-sd-foreground text-xs">
              {countsByDifficulty[0].mediumSolved}/{countsByDifficulty[0].mediumSolved + countsByDifficulty[0].mediumOther}
            </div>
          </div>
          <div
            onMouseEnter={()=>setSelected("HARD")}
            onMouseLeave={()=>setSelected("")}
            className="rounded-sm flex flex-1 flex-col items-center justify-center gap-0.5 shadow-[unset] bg-[#000a200d] dark:bg-[#ffffff1a] w-full p-2">
            <div className="text-xs font-medium text-red-500">Hard</div>
            <div className="text-sd-foreground text-xs">
              {countsByDifficulty[0].hardSolved}/{countsByDifficulty[0].hardSolved + countsByDifficulty[0].hardOther}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
