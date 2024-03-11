import React from "react"
import {
    Checkbox as MuiCheckbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormGroupProps,
} from "@mui/material"

interface CheckboxOption {
    value: string
    label: string
}

interface Props extends Omit<FormGroupProps, "onChange"> {
    options: CheckboxOption[]
    label?: string
    value?: string[]
    onChange: (value: (string | number)[]) => void
}

const CheckboxComponent: React.FC<Props> = ({
    options,
    label,
    value = [],
    onChange,
    ...rest
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const optionValue = event.target.value
        const isChecked = event.target.checked
        let newValue: (string | number)[] = [...value]

        if (isChecked) {
            newValue.push(optionValue)
        } else {
            newValue = newValue.filter((val) => val !== optionValue)
        }

        onChange(newValue)
    }

    return (
        <FormControl>
            {label && <div style={{ display: "block" }}>{label}</div>}
            <FormGroup>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <MuiCheckbox
                                checked={value.includes(option.value)}
                                onChange={handleChange}
                                value={option.value}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxComponent
