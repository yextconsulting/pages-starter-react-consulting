import React, {useState} from "react";
import TeamCard, { financialProfessional } from "src/components/Team/TeamCard";
import "src/styles/Team.css";

type TeamProps = {
  team?: financialProfessional[];
  initialSize?: number;
}

const Team = (props: TeamProps) => {
  const { team = [] } = props;
  if (!team) return null;

  let teamLength = team.length;
  let size = props.initialSize ?? teamLength;

  let viewMore = teamLength > size;

  let [visible, setVisible] = useState(() => {
    if (viewMore)
      return team.slice(0,size);
    else
      return team;
  });

  let [load, setLoad] = useState(!(visible.length === teamLength));

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
  