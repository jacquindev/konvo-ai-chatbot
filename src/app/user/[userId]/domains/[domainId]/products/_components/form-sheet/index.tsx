import AppButton from "@/components/global/app-button"
import { FormGenerator } from "@/components/global/form-generator"
import GlassSheet from "@/components/global/glass-sheet"
import UploadWidget from "@/components/global/upload-widget"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Plus } from "lucide-react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<any>
  errors: FieldErrors
  loading: boolean
  onSubmit: () => void
}

const ProductsFormSheet = ({ register, errors, loading, onSubmit }: Props) => {
  return (
    <GlassSheet
      title="Add Product"
      description="Create a new product for your domain."
      trigger={
        <AppButton className="hover:cursor-pointer">
          <Plus /> Add Product
        </AppButton>
      }
    >
      <Separator />
      <form onSubmit={onSubmit} className="flex flex-col gap-6 overflow-auto px-4">
        <div>
          <FormGenerator
            register={register}
            errors={errors}
            inputType="input"
            type="text"
            label="Product Name"
            name="name"
            placeholder="Type your product name"
            form="new-product-form"
          />
        </div>
        <div>
          <FormGenerator
            register={register}
            errors={errors}
            inputType="input"
            type="text"
            label="Product Price"
            name="price"
            placeholder="0.00"
            form="new-product-form"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Product Image</Label>
          <UploadWidget register={register} errors={errors} label="Product Image" />
        </div>

        <Button type="submit" className="hover:cursor-pointer" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Add Product"}
        </Button>
      </form>
    </GlassSheet>
  )
}

export default ProductsFormSheet
