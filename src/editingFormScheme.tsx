import { MultipleEditingPanelProps, FormTypeElement } from "components/MultipleEditor/types.ts";
import { getCountries } from "components/_private";
import { Country } from "models/index.ts";
import { Slider, SliderFilledTrack, SliderTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import moment from "moment";

export const editingFormScheme = [
  [
    {
      id: "name",
      type: FormTypeElement.input,
    },

    {
      id: "date",
      type: FormTypeElement.date,
      props: () => ({
        minDate: moment(),
      }),
    },
    {
      id: "age",
      Component: ({ onChange, value }: { onChange: (value: number) => void; value: number }) => {
        const formattedValue = value ?? 0;

        return (
          <Slider onChange={(val) => onChange(val)} defaultValue={formattedValue} min={0} max={100} step={1}>
            <SliderMark value={formattedValue} textAlign="center" bg="blue.500" color="white" mt="-10" ml="-5" w="12">
              {formattedValue}лет
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        );
      },
    },
  ],
  [
    {
      id: "country",
      type: FormTypeElement.autoComplete,
      isMultipleValue: true,
      props: {
        optionFormatter: ({ code, name }: Country) => ({
          label: name,
          value: code,
        }),
        optionsFetcher: getCountries,
      },
    },
    {
      id: "work",
      type: FormTypeElement.booleanRadioGroup,
    },
    {
      id: "work_company",
      type: FormTypeElement.input,
      props: (props) => {
        const { work } = props as { work: boolean | null };

        return {
          isDisabled: !work,
        };
      },
    },
  ],
] as const satisfies MultipleEditingPanelProps["formStructure"];
