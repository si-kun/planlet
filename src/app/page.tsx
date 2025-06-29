import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListCollapse } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const DammyCards = [
    {
      title: "個人タスク",
      color: "bg-blue-500/50",
      tasklength: 10,
      link: "/mytask",
    },
    {
      title: "グループタスク",
      color: "bg-pink-500/50",
      tasklength: 3,
      link: "grouptask",
    },
    {
      title: "TODO",
      color: "bg-green-400/50",
      tasklength: 4,
      link: "todo",
    },
  ];

  return (
    <div className="h-full">
      <header className="flex items-center justify-between p-4 bg-gray-100">
        <h1>Planlet</h1>
        <Button variant={"outline"} className="" asChild>
          <Link href={"new_task"}>New Task</Link>
        </Button>
      </header>

      <main className="bg-indigo-400 h-full p-4">
        <Card>
          <p>カレンダー実装エリア</p>
        </Card>

        <div className="flex flex-col gap-4">
          {DammyCards.map((card, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
              <Link
                href={card.link}
                className="flex items-center justify-between"
              >
                <h3>{card.title}</h3>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  className={`${card.color}`}
                >
                  <ListCollapse />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
