"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Dino } from "./type.ts";
import NextLink from "next/link";

const Link = NextLink.default;

export default function Home() {
	const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/dinosaurs`);
			const allDinosaurs = (await response.json()) as Dino[];
			setDinosaurs(allDinosaurs);
		})();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4">
			<h1 className="text-2xl m-4">Welcome to the Dinosaur app</h1>
			<p>Click on a dinosaur below to learn more.</p>
			{dinosaurs.map((dinosaur: Dino) => {
				return (
					<Link
						key={dinosaur.name}
						href={`/${dinosaur.name.toLowerCase()}`}
						className="p-1"
					>
						{dinosaur.name}
					</Link>
				);
			})}
		</main>
	);
}
