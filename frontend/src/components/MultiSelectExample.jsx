import React from "react";
import Select from "react-select";
//import makeAnimated from 'react-select/animated';

export default class MultiSelectExample extends React.Component {
  render() {
    /*
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
      { value: "oreo", label: "Oreo" },
      { value: "mint", label: "Mint" },
      { value: "death-by-chocolate", label: "Death by Chocolate" },
      { value: "rocky-road", label: "Rocky-Road" },
      { value: "caramel", label: "Caramel" },
      { value: "pistachio", label: "Pistachio" },
      { value: "raspberry", label: "Raspberry" },
      { value: "butter-pecan", label: "Butter Pecan" },
      { value: "cherry", label: "Cherry" },
      { value: "coconut", label: "Coconut" },
      { value: "birthday-cake", label: "Birthday Cake" },
    ];
    */

    return (
      <div>
        <Select options={this.props.allProgramTags} isMulti />
      </div>
    );
  }
}
