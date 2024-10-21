"use client";

import { useEffect, useState } from "react";
import { Dino } from "../type.ts";
import NextLink from "next/link";
import React from "react";

type RouteParams = { params: { dinosaur: string } };

const Link = NextLink.default;

export default function Dinosaur(request: RouteParams) {
  const selectedDinosaur = request.params.dinosaur;
  const [dinosaur, setDino] = useState<Dino>({ name: "", description: "" });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/dinosaurs/${selectedDinosaur}`);
      const dino = (await resp.json()) as Dino;
      setDino(dino);
    })();
  }, [selectedDinosaur]);

  return (
    <main className="flex flex-col items-center justify-between m-12 p-4 rounded-lg bg-gray-100 shadow-lg text-black">
      <h1 className="text-2xl">{dinosaur.name}</h1>
      <p className="p-4">{dinosaur.description}</p>
      <Link href="/" className="mb-4">
        🠠 Back to all dinosaurs
      </Link>
    </main>
  );
}
