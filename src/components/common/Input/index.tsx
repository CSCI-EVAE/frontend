import React from "react";
import { Rating } from "@mui/material";
import { TextField } from "@mui/material";

interface Props {
    autoComplete?: string;
    type: string;
    value: string;
    error?: string[];
    step?: number;
    decimals?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
    rows?: number;
    label?: string;
    name: string;
    onInputChange: (name: string, value: string | number | null) => void;
    inlineElement?: React.ReactNode;
    defaultValue?: string;
}

const Input: React.FC<Props> = ({
    autoComplete,
    type,
    value,
    error,
    step = 1,
    decimals = true,
    min = 0,
    max,
    disabled,
    placeholder,
    rows = 4,
    label,
    name,
    onInputChange,
    inlineElement,
    defaultValue,
}) => {
    const _onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onInputChange(e.target.name, e.target.value);
    };

    if (type === "textarea") {
        return (
            <div>
                {label && <label>{label}</label>}
                <div>
                    <TextField
                        multiline
                        rows={rows}
                        name={name}
                        value={value}
                        onChange={_onChange}
                        placeholder={placeholder}
                        error={!!error}
                        helperText={error && error[0]}
                        defaultValue={defaultValue}
                        required
                    />
                </div>
            </div>
        );
    } else if (type === "number") {
        const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!decimals) {
                e.target.value = e.target.value.replace(/[^0-9]*/g, "");
            }
        };

        return (
            <div>
                {label && <label>{label}</label>}
                <div>
                    <TextField
                        autoComplete={autoComplete}
                        type="number"
                        inputProps={{ step, min, max }}
                        onChange={_onChange}
                        onInput={handleOnInput}
                        disabled={disabled}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        error={!!error}
                        helperText={error && error[0]}
                        defaultValue={defaultValue}
                        required
                    />
                </div>
            </div>
        );
    } else if (type === "stars") {
        return (
            <div>
                {label && <label>{label}</label>}
                <Rating
                    name={name}
                    value={Number(value)}
                    onChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        newValue: number | null
                    ) => {
                        onInputChange(name, newValue !== null ? newValue : 0);
                    }}
                />
            </div>
        );
    } else {
        return (
            <div>
                {label && <label>{label}</label>}
                <div>
                    <TextField
                        autoComplete={autoComplete}
                        type={type}
                        onChange={_onChange}
                        disabled={disabled}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        error={!!error}
                        defaultValue={defaultValue}
                        helperText={error && error[0]}
                        required
                    />
                    {inlineElement}
                </div>
            </div>
        );
    }
};

Input.defaultProps = {
    step: 1,
    decimals: true,
    rows: 4,
    inlineElement: null,
    autoComplete: "on",
};

export default Input;
