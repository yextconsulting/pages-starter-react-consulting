import React, {useState} from "react";
import TeamCard, { financialProfessional } from "src/components/Team/TeamCard";
import "src/styles/Team.css";

type TeamProps = {
  title?: string;
  team?: financialProfessional[];
}

const Team = (props: TeamProps) => {
  const { team = [] } = props;
  let [visible, setVisible] = useState([ team[0] ]);
  if (!props.team) return null;
  console.log(team);
  return (
    <div className="Team-container centered-container">
      <div className="Team-title Heading--head"> Meet the Team </div>
      <ul className="Team-list">
        {visible.map((member) => (
          <li className="Team-listItem" key={member.name}> 
            <TeamCard profile={member}/>
          </li>
        ))}
      </ul>
      <button onClick={() => setVisible(team)}> Load More </button>
    </div>
  )
}

export default Team;
  