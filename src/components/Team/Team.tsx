import React, {useState} from "react";
import TeamCard, { financialProfessional } from "src/components/Team/TeamCard";
import "src/styles/Team.css";

type TeamProps = {
  team?: financialProfessional[];
  initialSize?: number;
}

const Team = (props: TeamProps) => {
  const { team = [], initialSize } = props;
  if (!team) return null;

  let [visible, setVisible] = useState(initialSize ? team.slice(0, Math.min(initialSize, team.length)) : team);
  let [load, setLoad] = useState(!(visible.length === team.length));

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
      <button className="Team-loadBtn Button Button--secondary" onClick={() => {setVisible(team); setLoad(false)}}> Load More </button>
      )}
    </div>
  )
}

export default Team;
  