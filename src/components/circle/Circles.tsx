import React from "react";
import { CircleType } from "../../utility/utility";
import Circle from "./Circle";

type CirclesProps = {
    row: CircleType[];
};

export default function Circles({ row }: CirclesProps) {
    return (
        <div className="flex flex-col gap-2">
            {row.map((item, index) => {
                return <Circle key={index} item={item} />;
            })}
        </div>
    );
}
