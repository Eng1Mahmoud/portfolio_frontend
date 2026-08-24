"use client";
import {
  recommendationsSchema,
  RECOMMENDATION_RELATIONS,
} from "@/zod/recommendationsSchema";
import { addRecommendationAction } from "@/actions/addRecommendation";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import CheckboxField from "@/components/forms/CheckboxField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";

const AddRecommendationForm = () => {
  const initialValues = {
    name: "",
    role: "",
    company: "",
    avatar: "",
    text: "",
    relation: "" as (typeof RECOMMENDATION_RELATIONS)[number],
    date: "",
    linkedinUrl: "",
    featured: false,
    order: "" as "" | number,
  };

  return (
    <Form
      defaultValues={initialValues}
      schema={recommendationsSchema}
      action={addRecommendationAction}
      redirectPath="/dashboard/recommendations"
      buttonProps={{ name: "Add Recommendation" }}
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField name="name" label="Name" type="text" variant="light" />
          <SelectField
            name="relation"
            label="Relationship"
            options={RECOMMENDATION_RELATIONS}
            placeholder="How do they know you?"
            variant="light"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            name="role"
            label="Role / Title"
            type="text"
            variant="light"
          />
          <InputField
            name="company"
            label="Company (optional)"
            type="text"
            variant="light"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            name="date"
            label="Date Written"
            type="date"
            variant="light"
          />
          <InputField
            name="linkedinUrl"
            label="LinkedIn Profile URL (optional)"
            type="url"
            variant="light"
          />
        </div>

        <InputField
          name="order"
          label="Display order — lower shows first, blank goes last"
          type="number"
          variant="light"
        />

        <ImageUploadInput
          name="avatar"
          label="Avatar (optional)"
          className="w-full"
        />

        <TextArea
          name="text"
          label="Recommendation Text"
          rows={7}
          variant="light"
        />

        <CheckboxField
          name="featured"
          label="Feature this recommendation"
          hint="Pins it to the top of its group and shows it on the home page."
          variant="light"
        />
      </div>
    </Form>
  );
};

export default AddRecommendationForm;
