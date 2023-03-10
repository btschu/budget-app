import React from "react";
import { Stack, Button, Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  hideButtons,
  onViewExpensesClick,
  theme,
}) => {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger bg-opacity-50");
  } else if (gray) {
    classNames.push({ theme });
  }

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2"><span>{name}</span></div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button 
              className="ms-auto" 
              variant="sm" 
              onClick={onAddExpenseClick}
              aria-label={`Add items to ${name}`}
              title={`Add items to ${name}`}>
              Add Expense
            </Button>
            <Button 
              onClick={onViewExpensesClick} 
              variant="sm"
              aria-label={`View, edit, or delete items in ${name}`}
              title={`View, edit, or delete items in ${name}`}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
