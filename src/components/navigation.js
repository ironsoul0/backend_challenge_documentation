import React from 'react';
import PropTypes from 'prop-types';
import NavigationItem from './navigation_item';
import { footerContent } from '../custom';

function getAllInSectionFromChild(headings, idx) {
  for (var i = idx; i > 0; i--) {
    if (headings[i].depth === 2) {
      return getAllInSection(headings, i);
    }
  }
}

function getAllInSection(headings, idx) {
  var activeHeadings = [];
  for (var i = idx + 1; i < headings.length; i++) {
    if (headings[i].depth === 3) {
      activeHeadings.push(headings[i].children[0].value);
    } else if (headings[i].depth === 2) {
      break;
    }
  }
  return activeHeadings;
}

export default class Navigation extends React.PureComponent {
  static propTypes = {
    ast: PropTypes.object.isRequired,
    activeSection: PropTypes.string,
    navigationItemClicked: PropTypes.func.isRequired
  }
  render() {
    var activeHeadings = [];
    let headings = this.props.ast.children
      .filter(child => child.type === 'heading');

    if (this.props.activeSection) {

      let activeHeadingIdx = headings.findIndex(heading =>
        heading.children[0].value === this.props.activeSection);
      let activeHeading = headings[activeHeadingIdx];

      if (activeHeading.depth === 3) {
        activeHeadings = [this.props.activeSection]
          .concat(getAllInSectionFromChild(headings, activeHeadingIdx));
      }

      // this could potentially have children, try to find them
      if (activeHeading.depth === 2) {
        activeHeadings = [this.props.activeSection]
          .concat(getAllInSection(headings, activeHeadingIdx));
      }
    }

    activeHeadings = activeHeadings.reduce((memo, heading) => {
      memo[heading] = true;
      return memo;
    }, {});

    return (<div className='pad0x small'>
      
        {footerContent}
    </div>);
  }
}
