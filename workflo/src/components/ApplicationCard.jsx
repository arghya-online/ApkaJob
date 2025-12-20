import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

function ApplicationCard({ application, isCandidate = false, fetchJob }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.download = `resume-${application?.name || "unknown"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { loading: loadingStatus, fn: fnStatus } = useFetch(
    updateApplicationStatus
  );

  return (
    <Card className="bg-amber-50">
      {loadingStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <div className="flex flex-col items-center cursor-pointer">
            <Download
              size={18}
              className="bg-black text-white rounded-full h-10 w-10 p-1 cursor-pointer"
              onClick={handleDownload}
            />
            <p className="text-sm">Resume</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} /> {application?.experience} years of
            experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={15} />
            {application?.qualification}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} />
            Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application?.status}
          </span>
        ) : (
          <Select
            onValueChange={(value) => {
              fnStatus(application.id, value).then(() => fetchJob && fetchJob());
            }}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52 hover:border-zinc-500 transition">
              <SelectValue
                className="text-black font-bold"
                placeholder="Application Status"
              />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem className="hover:bg-zinc-200" value="applied">
                Applied
              </SelectItem>
              <SelectItem className="hover:bg-zinc-200" value="interviewing">
                Interviewing
              </SelectItem>
              <SelectItem className="hover:bg-zinc-200" value="hired">
                Hired
              </SelectItem>
              <SelectItem className="hover:bg-zinc-200" value="rejected">
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationCard;
