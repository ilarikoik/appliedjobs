//

import { useTheme } from "../context/Theme";
import { formatDate } from "../utils/formatDate";
import getRightIcon from "../utils/jobStatusIcon";

type JobData = {
  app_user_id: number;
  job_role: string;
  job_employee: string;
  job_location: string;
  job_applied_date: Date;
  job_link: string;
  job_status: string;
};

type JobsListProps = {
  jobData: JobData[];
};

export default function Jobs({ jobData }: JobsListProps) {
  const { theme } = useTheme();

  console.log(JSON.stringify(jobData) + "jobbbdata");
  return (
    <div className="w-full flex justify-center items-center flex-col ">
      {jobData.length === 0 ? (
        <p>Ei hakemusia</p>
      ) : (
        jobData.map((item, index) => {
          return (
            <div
              key={index}
              className={` w-4/5 max-w-[1100px] h-fit p-5 border-2 mb-10 rounded-lg ${
                theme === "light" ? "border-neutral-200" : "border-neutral-900"
              } `}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl">{item.job_role.toUpperCase()}</h1>
                <p className="text-blue-500 hover:cursor-pointer">✏️Edit</p>
              </div>
              <p>🏢 {item.job_employee}</p>
              <p>📍 {item.job_location}</p>
              <p>📅 {formatDate(item.job_applied_date.toString())}</p>
              <div className="flex w-full flex-col sm:flex-row sm:justify-between">
                <p>{getRightIcon(item.job_status) + item.job_status}</p>
                <a
                  target="_blank"
                  href={item.job_link}
                  className="text-blue-500"
                >
                  🔗 Open link
                </a>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
