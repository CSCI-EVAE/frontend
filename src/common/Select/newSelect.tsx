import React from "react"
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    FormControlProps,
    FormHelperText,
} from "@mui/material"
import { useForm } from "react-hook-form"
interface SelectOption {
    value: string | number
    label: string
}
interface Props extends Omit<FormControlProps, "onChange"> {
    options: SelectOption[]
    label?: string
    value?: string | number
    name: string // Ajoutez le nom du champ pour React Hook Form
    size?: "small" | "medium"
    placeholder?: string
    onChange: (value: string | number) => void
    defaultValue?: string
}

const SelectComponent: React.FC<Props> = ({
    options,
    label,
    value,
    onChange,
    placeholder,
    size,
    name,
    defaultValue,
    ...rest
}) => {
    const {
        //register,
        formState: { errors },
    } = useForm({
        mode: "all",
    })
    const handleChange = (event: SelectChangeEvent<string | number>) => {
        let selectedValue

        selectedValue = event.target.value as string | number

        onChange(selectedValue)
    }

    return (
        <FormControl
            error={!!errors[name]}
            fullWidth
            //sx={{ minWidth: size === 'small' ? 120 : size === 'medium' ? 150 : 250, ...rest.sx }}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                onChange={handleChange}
                fullWidth
                value={value}
                label={label}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {errors[name]?.message &&
                typeof errors[name]?.message === "string" && (
                    <FormHelperText error>
                        {String(errors[name]?.message)}
                    </FormHelperText>
                )}
        </FormControl>
    )
}

export default SelectComponent
