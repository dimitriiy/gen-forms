# React + TypeScript + Vite
## Генерация формы на основе заданной структуры


- Запуск приложения

```js
  yarn install
  yarn dev
```


### @Doc
Генерация формы строится на основе структуры, переданной пользователем

```ts
//Можно задать два типа элементов формы: 
// 1. Элемент, который определяется переданным типом FormTypeElement
 export type BaseRegistryColumn<Id extends string = string> = {
        id: Id;
        type: FormTypeElement;
        label?: string;
        };

// таких элементов сейчас 5, внешний вид и логика инкапсулирована внутри формы,
// пользовтель может только передавать пропсы
export enum FormTypeElement {
    input = "Input",
    date = "Date",
    booleanRadioGroup = "booleanRadioGroup",
    textArea = "TextArea",
    autoComplete = "AutoComplete",
    //new widgets...
}


//Пример
export interface InputColumn<Id extends string = string, Props = OuterInputFieldProps> extends BaseRegistryColumn<Id> {
    type: FormTypeElement.input;
    props?: Props | ((props: unknown) => Props);
}

// 2 тип - любой кастомный компонент
export type ElementWithCustomComponent<Id extends string = string, T = any> = {
    id: Id;
    Component: (props: OnChangeProps<T>) => React.ReactNode;
    label?: string;
};
```



```ts
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
```

