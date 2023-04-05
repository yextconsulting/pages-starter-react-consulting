import { useState } from "react";
import type { FinancialProfessionalProfile } from "src/types/entities";
import TeamCard from "src/components/cards/TeamCard";

type TeamProps = {
  title: string;
  team: FinancialProfessionalProfile[];
  initialSize?: number;
};

const Team = (props: TeamProps) => {
  const { title, team, initialSize } = props;

  const [numberVisible, setNumberVisible] = useState(
    initialSize ? Math.min(initialSize, team.length) : team.length
  );
  const visible = team.slice(0, numberVisible);
  const load = numberVisible !== team.length;

  return (
    <div className="Team py-8 sm:py-16">
      <div className="container">
        <h2 className="Heading Heading--head mb-8 md:text-center">{title}</h2>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, i) => (
            <li key={i}>
              <TeamCard profile={member} />
            </li>
          ))}
        </ul>
        {load && (
          <button
            className="Button Button--secondary m-auto mt-8"
            onClick={() => {
              setNumberVisible(team.length);
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Team;
