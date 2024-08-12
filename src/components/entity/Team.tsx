import { useState } from "react";
import type {
  FinancialProfessionalProfile,
  LocationProfile,
} from "src/types/entities";
import TeamCard from "src/components/cards/TeamCard";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

type TeamProps = {
  initialSize?: number;
};

const Team = (props: TeamProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const team = profile.c_teamSection;

  if (team?.title && team?.team) {
    return (
      <ErrorBoundaryWithAnalytics name="team">
        <TeamLayout
          title={team.title}
          team={team.team}
          initialSize={props.initialSize}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type TeamLayoutProps = TeamProps & {
  title: string;
  team: FinancialProfessionalProfile[];
};

const TeamLayout = (props: TeamLayoutProps) => {
  const { title, team, initialSize } = props;

  const [numberVisible, setNumberVisible] = useState(
    initialSize ? Math.min(initialSize, team.length) : team.length
  );
  const visible = team.slice(0, numberVisible);
  const load = numberVisible !== team.length;

  return (
    <div className="py-8 sm:py-16">
      <div className="container">
        <h2 className="heading heading-head mb-8 md:text-center">{title}</h2>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, i) => (
            <li key={i}>
              <TeamCard profile={member} />
            </li>
          ))}
        </ul>
        {load && (
          <button
            className="button button-secondary m-auto mt-8"
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
