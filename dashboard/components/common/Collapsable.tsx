import React from "react";
import { styled } from "@stitches/react";
import { violet, blackA } from "@radix-ui/colors";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Question } from "../containers/dimSurvey";
import { theme } from "../../styles/theme";

const StyledCollapsible = styled(CollapsiblePrimitive.Root, {
  width: 300,
  length: 0,
});

// Exports
export const Collapsible = StyledCollapsible;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = CollapsiblePrimitive.Content;

// Your app...
const Flex = styled("div", {
  display: "flex",
  length: 0,
});
const Text = styled("span", {
  color: theme.colors.gray800,
  fontSize: 15,
  lineHeight: "25px",
  length: 0,
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&[data-state="closed"]': { backgroundColor: "white" },
  '&[data-state="open"]': { backgroundColor: violet.violet3 },
  "&:hover": { backgroundColor: violet.violet3 },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  length: 0,
});

const Repository = styled("div", {
  backgroundColor: theme.colors.gray400,
  border: "1px solid $gray600",
  borderRadius: 4,
  margin: "10px 0",
  padding: 10,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  length: 0,
  width: "450px",
});
type CollapsibleProps = {
  content: Question[];
};
export const CollapsibleDemo: React.FC<CollapsibleProps> = ({ content }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ color: `${theme.colors.gray900}` }}> Questions</h3>
        <CollapsibleTrigger asChild>
          <IconButton>{open ? <Cross2Icon /> : <RowSpacingIcon />}</IconButton>
        </CollapsibleTrigger>
      </Flex>

      <CollapsibleContent>
        {content.map((question: Question) => (
          <Repository key={question.title + question.question + question.type}>
            <Text>{question.question}</Text>
          </Repository>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleDemo;
