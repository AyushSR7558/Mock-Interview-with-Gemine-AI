"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { createMockInterview } from "@/app/actions/createMockInterview";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yoe, setYoe] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mockId = await createMockInterview({
        jobPosition,
        jobDescription,
        yoe,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(mockId);

      router.push("/dashboard/interview/" + mockId);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div className="m-2">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">
              Tell us more about your job interview
            </DialogTitle>

            <DialogDescription asChild>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <div className="my-3">
                    <label className="block mb-1">Job Role</label>
                    <Input
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="block mb-1">Job Description</label>
                    <Textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="block mb-1">Years of Experience</label>
                    <Input
                      type="number"
                      value={yoe}
                      onChange={(e) => setYoe(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Start Interview"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
