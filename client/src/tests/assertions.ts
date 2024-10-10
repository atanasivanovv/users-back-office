import { waitFor } from "@testing-library/dom";

const skeletonSelector = "span.react-loading-skeleton";
const getAllSkeletons = () =>
  Array.from(document.querySelectorAll(skeletonSelector));

export const waitForSkeletonsToHide = async () => {
  const skeletonElements = getAllSkeletons();

  await waitFor(() => {
    skeletonElements.forEach((skeleton) => expect(skeleton).not.toBeVisible());
  });
};
