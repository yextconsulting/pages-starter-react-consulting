import React, {useState} from "react";
import TeamCard, { financialProfessional } from "src/components/Team/TeamCard";
import "src/styles/Team.css";

type TeamProps = {
  team?: financialProfessional[];
}

const Team = (props: TeamProps) => {
  const { team = [] } = props;
  if (!props.team) return null;

  let viewMore = team.length > 6;
  let teamLength = team.length;

  let [visible, setVisible] = useState(() => {
    if (viewMore)
      return team.slice(0,6);
    else
      return team;
  });

  let [load, setLoad] = useState(() => {
    if (visible.length == teamLength)
      return false;
    else
      return true;
  })

  return (
    <div className="Team-container centered-container">
      <div className="Team-title Heading--head">Meet Our Team</div>
      <ul className="Team-list">
        {visible.map((member) => (
          <li className="Team-listItem" key={member.name}> 
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
  