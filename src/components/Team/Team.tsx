import React, {useState} from "react";
import TeamCard, { financialProfessional } from "src/components/Team/TeamCard";
import "src/styles/Team.css";

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
  team: financialProfessional[];
  initialSize?: number;
}

const Team = (props: TeamProps) => {
  const { team, initialSize } = props;
  if (!team) return null;

  const [numberVisible, setNumberVisible] = useState(initialSize ? Math.min(initialSize, team.length) : team.length);
  const visible = team.slice(0, numberVisible);
  const load = numberVisible !== team.length;


  return (
    <div className="Team-container centered-container">
      <h2 className="Team-title Heading--head">Meet Our Team</h2>
      <ul className="Team-list">
        {visible.map((member) => (
          <li className="Team-listItem" key={member.id}> 
            <TeamCard profile={member}/>
          </li>
        ))}
      </ul>
      {load && (
      <button className="m-auto Button Button--secondary" onClick={() => {setNumberVisible(team.length)}}> Load More </button>
      )}
    </div>
  )
}

export default Team;
  