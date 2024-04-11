import { Select } from "@chakra-ui/react";
import React from "react";
import { Spinner } from "@chakra-ui/react";

export type Option = {
  label: string;
  value: string;
};
export type OptionFormatter<T = any> = (data: T) => Option;

export interface AsyncMultiSelectProps {
  values?: Option[];
  wordsDelimeter?: string;
  onChange: (options: Option[]) => void;
  optionsFetcher: (params?: string[]) => Promise<unknown>;
  optionFormatter: OptionFormatter;
  optionsRoot?: string;
  selectedShowLabel?: boolean;
  isSingle?: boolean;
  autoFocus?: boolean;
  preloadOptions?: boolean;
  defaultOptions?: string[];
  placeholder?: string;
}
export const AsyncMultiSelect: React.FC<AsyncMultiSelectProps> = ({ onChange, optionFormatter, optionsFetcher }) => {
  const [options, setOptions] = React.useState<Option[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function loadOptions() {
      setLoading(true);
      const data = (await optionsFetcher()) as any[];

      setOptions(data.map(optionFormatter));
      setLoading(false);
    }

    loadOptions();
  }, []);

  return (
    <div>
      <Select
        placeholder="Выберите страну"
        icon={isLoading ? <Spinner /> : undefined}
        onChange={(e) =>
          onChange([
            {
              value: e.target.value,
              label: e.target.value,
            },
          ])
        }
      >
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  );
};
