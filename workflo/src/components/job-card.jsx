
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveJob, deleteJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobAction = () => { },
}) {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    setSaved(!saved);
    onJobAction();
  };

  console.log("LogoId:", job.company?.logo_url);

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="group flex h-full flex-col rounded-xl border bg-background transition-all duration-300 hover:shadow-lg">

      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div className="flex items-center gap-3 min-w-0">
          {job.company && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
              <img
                src={job.company.logo_url}
                alt={job.company.name}
                className="h-9 w-9 object-contain"
              />
            </div>
          )}

          <div className="min-w-0">
            <CardTitle className="truncate text-base font-semibold md:text-lg">
              {job.title}
            </CardTitle>
            <CardDescription className="truncate text-sm">
              {job.company?.name}
            </CardDescription>
          </div>
        </div>

        <CardAction className="shrink-0">
          {isMyJob ? (
            <Trash2
              size={18}
              className="cursor-pointer text-muted-foreground transition hover:text-destructive"
              onClick={handleDeleteJob}
              disabled={loadingDeleteJob}
            />
          ) : (
            <Heart
              size={18}
              fill={saved ? "red" : "none"}
              className={`cursor-pointer transition ${saved
                  ? "text-red-500"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              onClick={handleSaveJob}
              disabled={loadingSavedJob}
            />
          )}
        </CardAction>
      </CardHeader>


      <CardContent className="grow space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            <MapPin size={14} />
            {job.location}
          </span>
        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {job.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between border-t bg-muted/30 px-5 py-3">
        <span className="text-xs text-muted-foreground">
          Posted {new Date(job.created_at).toLocaleDateString()}
        </span>

        <Link to={`/job/${job.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="transition group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default JobCard;
