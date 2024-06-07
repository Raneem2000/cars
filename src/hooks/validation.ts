import { number, object, string } from "yup";

export const CurrenciesValidation = object().shape({
  dollar_price: number().required("الحقل مطلوب"),
  currency: string().required("الحقل مطلوب"),
});

export const PerTypeValidation = object().shape({
  name: string().required("الحقل مطلوب"),
  description: string().required("الحقل مطلوب"),
  image: string().test({
    name: "required",
    message: "الحقل مطلوب",
    test: function (value, { parent }) {
      const id = parent.id;
      if (!id && (!value || value.trim() === "")) {
        return false;
      }
      return true;
    }
  }).nullable(),
});
// password: yup.string().when("id", {
//   is: (id: any) => !id,
//   then: yup.string().required(t("form.required")),
// }),
export const ProductValidation = object().shape({
  name: string().required("الحقل مطلوب"),
});
export const CarModelTypeValidation = object().shape({
  value: string().required("الحقل مطلوب"),
});
export const firstCheackTypeValidation = object().shape({
  value: string().required("الحقل مطلوب"),

});
export const CarMotorTypeValidation = object().shape({
  name: string().required("الحقل مطلوب"),
});
export const UpdateProductBracnh = object().shape({
  min_multiple_notification: number().required("الحقل مطلوب"),
});
export const DeliveryTypeValidation = object().shape({
  city: string().required("الحقل مطلوب"),
  cost: number().required("الحقل مطلوب"),
});