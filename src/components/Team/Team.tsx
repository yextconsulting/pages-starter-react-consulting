import React from "react";
import TeamCard, { financialProfessional } from "src/components/Team/TeamCard";

type TeamProps = {
  title?: string;
  team?: financialProfessional[];
}

const Team = (props: TeamProps) => {
  const { team = [] } = props;
  if (!props.team) return null;
  console.log(team);
  return (
    <div>
      <div> Meet the Team </div>
      <ul>
        {team.map((member) => (
          <li key={member.name}> 
            <TeamCard name={member.name} headshot={member.headshot} mainPhone={member.mainPhone}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Team;
  