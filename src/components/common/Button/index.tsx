import React, { FC } from "react";
import Button from "@mui/material/Button";

interface Props {
    size?: "small" | "medium" | "large";
    variant?: "text" | "outlined" | "contained";
    tabIndex?: number;
    ariaLabel?: string;
    ariaExpanded?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    text?: string;
    role?: string;
    icon?: React.ReactNode;
    iconDirection?: "left" | "right";
    iconClassName?: string;
    borderless?: boolean;
    round?: number;
    onClick?: () => void;
}

const ButtonComponent: FC<Props> = ({
    size = "medium",
    variant = "contained",
    tabIndex,
    ariaLabel,
    ariaExpanded,
    type = "button",
    disabled,

    text,
    role,
    icon,
    iconDirection = "left",
    iconClassName = "",
    borderless,
    round = 3,
    onClick,
}) => {
    const btn =
        icon && text ? "with-icon" : icon && !text ? "icon-only" : "text-only";

    const classNames = `${` ${size}`} ${btn} ${
        iconDirection === "left" ? "icon-left" : "icon-right"
    } ${borderless ? "border-0" : ""}`;

    const iconClassNames = `btn-icon${`${iconClassName && ` ${iconClassName}`}`}`;

    return (
        <Button
            size={size}
            variant={variant}
            tabIndex={tabIndex}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            role={role}
            disabled={disabled}
            className={classNames}
            type={type}
            onClick={onClick}
            style={{ borderRadius: round }}
        >
            {iconDirection === "left" ? (
                <>
                    {icon && <div className={iconClassNames}>{icon}</div>}
                    {text && <span className="btn-text">{text}</span>}
                </>
            ) : (
                <>
                    {text && <span className="btn-text">{text}</span>}
                    {icon && <div className={iconClassNames}>{icon}</div>}
                </>
            )}
        </Button>
    );
};

ButtonComponent.defaultProps = {
    type: "button",
    variant: "contained",
    size: "medium",
    iconDirection: "left",
    iconClassName: "",
    borderless: false,
    round: 3,
};

export default ButtonComponent;
