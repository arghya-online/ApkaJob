import { getApplications } from "@/api/apiApplication";
import { getMyJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import ApplicationCard from "@/components/ApplicationCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingMyJobs,
    data: myJobs,
    fn: fnMyJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user?.id,
  });

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded) {
      if (user?.unsafeMetadata?.role === "recruiter") {
        fnMyJobs();
      } else {
        fnApplications();
      }
    }
  }, [isLoaded]);

  if (!isLoaded || loadingMyJobs || loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-4xl text-center pb-8 pt-10">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      <p className="text-center mb-4 text-zinc-700">
        View, Delete the jobs you have posted
      </p>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications applications={applications} />
      ) : (
        <CreatedJobs myJobs={myJobs} onJobAction={fnMyJobs} />
      )}
    </div>
  );
};

const CreatedJobs = ({ myJobs, onJobAction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {myJobs?.length ? (
        myJobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              onJobAction={onJobAction}
              isMyJob={true}
            />
          );
        })
      ) : (
        <div className="mt-8 text-center font-medium text-lg text-muted-foreground">
          No Jobs Found
        </div>
      )}
    </div>
  );
};

const CreatedApplications = ({ applications }) => {
  return (
    <div className="flex flex-col gap-2">
      {applications?.length ? (
        applications.map((application) => {
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          );
        })
      ) : (
        <div className="mt-8 text-center font-medium text-lg text-muted-foreground">
          No Applications Found
        </div>
      )}
    </div>
  );
};

export default MyJobs;
