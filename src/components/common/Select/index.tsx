import React from "react";
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
   // InputLabel,
    SelectChangeEvent,
    FormControlProps,
} from "@mui/material";

interface SelectOption {
    value: string | number;
    label: string;
}
interface Props extends Omit<FormControlProps, "onChange"> {
    options: SelectOption[];
    label?: string;
    value?: string | number | (string | number)[];
    multiple?: boolean;
    onChange: (value: string | number | (string | number)[]) => void;
    size?: "small" | "medium";
    maxSelection?: number; // Ajoutez la limite maximale de sélection
    placeholder?: string;
}

const SelectComponent: React.FC<Props> = ({
    options,
    label,
    value,
    placeholder,
    multiple,
    size,
    maxSelection,
    onChange,
    ...rest
}) => {
    const handleChange = (
        event: SelectChangeEvent<string | number | (string | number)[]>
    ) => {
        let selectedValue;
        if (multiple && maxSelection) {
            const selectedValues = event.target.value as (string | number)[];
            selectedValue = selectedValues.slice(0, maxSelection); // Limiter le nombre de choix
        } else {
            selectedValue = multiple
                ? event.target.value
                : (event.target.value as string | number);
        }
        onChange(selectedValue);
    };

    return (
        <div>
            {label && <div style={{ display: "block" }}>{label}</div>}
            <FormControl
                sx={{
                    minWidth:
                        size === "small" ? 120 : size === "medium" ? 150 : 250,
                    ...rest.sx,
                }}
            >
                <MuiSelect
                    autoWidth
                    value={value}
                    onChange={handleChange}
                    multiple={multiple}
                    label={label}
                    placeholder={placeholder}
                    sx={{ width: "100%" }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
        </div>
    );
};

export default SelectComponent;
