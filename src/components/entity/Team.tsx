import React, {useState} from "react";
import TeamCard from "src/components/entity/TeamCard";
import type { financialProfessional } from "src/types/entities";

const defaultFields: string[] = [
  'c_teamSection.title',
  'c_teamSection.team.id',
  'c_teamSection.team.name',
  'c_teamSection.team.headshot',
  'c_teamSection.team.mainPhone',
  'c_teamSection.team.c_occupation',
  'c_teamSection.team.emails',
  'c_teamSection.team.websiteUrl',
];

type TeamProps = {
  title: string;
  team: financialProfessional[];
  initialSize?: number;
}

const Team = (props: TeamProps) => {
  const { title, team, initialSize } = props;

  const [numberVisible, setNumberVisible] = useState(initialSize ? Math.min(initialSize, team.length) : team.length);
  const visible = team.slice(0, numberVisible);
  const load = numberVisible !== team.length;


  return (
    <div className="Team py-8 sm:py-16">
      <div className="container">
        <h2 className="Heading Heading--head mb-8 md:text-center">{title}</h2>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, i) => (
            <li key={i}>
              <TeamCard profile={member}/>
            </li>
          ))}
        </ul>
        {load && (
          <button className="Button Button--secondary m-auto mt-8" onClick={() => {setNumberVisible(team.length)}}>Load More</button>
        )}
      </div>
    </div>
  )
}

export {
  Team,
  defaultFields,
};
