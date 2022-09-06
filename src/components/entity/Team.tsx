import React, {useState} from "react";
import TeamCard from "src/components/entity/TeamCard";
import { financialProfessional } from "src/types/entities";

export const teamFields = [
  "c_team.id",
  "c_team.name",
  "c_team.headshot",
  "c_team.mainPhone",
  "c_team.c_occupation",
  "c_team.emails",
  "c_team.websiteUrl",
]

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
        <ul className="grid grid-cols-3 gap-8">
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

export default Team;
  