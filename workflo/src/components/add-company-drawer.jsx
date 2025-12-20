import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer className="z-50">
      <DrawerTrigger asChild>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="hover:bg-zinc-200 transition-colors"
        >
          Add Company
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className="
      bg-white
      max-w-3xl
      mx-auto
      rounded-t-2xl
      sm:rounded-2xl
      shadow-2xl
      px-4
      sm:px-6
      pb-6
    "
      >
        {/* Header */}
        <DrawerHeader className="border-b pb-3">
          <DrawerTitle className="text-xl font-semibold text-zinc-900">
            Add a New Company
          </DrawerTitle>
        </DrawerHeader>

        {/* Form */}
        <form
          className="
        mt-6
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-4
      "
        >
          {/* Company Name */}
          <Input
            placeholder="Company name"
            {...register("name")}
            className="
          bg-white
          border
          border-zinc-300
          hover:border-zinc-500
          focus:border-black
          transition
        "
          />

          {/* Company Logo */}
          <Input
            type="file"
            accept="image/*"
            {...register("logo")}
            className="
          bg-white
          border
          border-zinc-300
          hover:border-zinc-500
          file:bg-zinc-100
          file:text-zinc-700
          file:border-0
          file:px-3
          file:py-1
          file:rounded-md
          transition
        "
          />

          {/* Add Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            variant="destructive"
            className="
          sm:col-span-2
          h-11
          hover:bg-red-600
          transition
        "
          >
            Add Company
          </Button>
        </form>

        {/* Footer */}
        <DrawerFooter className="mt-4 space-y-2">
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          {errors.logo && (
            <p className="text-sm text-red-500">{errors.logo.message}</p>
          )}

          {errorAddCompany?.message && (
            <p className="text-sm text-red-500">{errorAddCompany.message}</p>
          )}

          {loadingAddCompany && <BarLoader width="100%" color="#000000" />}

          <DrawerClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="hover:bg-zinc-200 transition"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
