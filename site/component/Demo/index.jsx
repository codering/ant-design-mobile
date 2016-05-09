import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import * as utils from '../utils';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expand === undefined) return;

    this.setState({
      codeExpand: nextProps.expand,
    });
  }

  handleCodeExapnd = () => {
    this.setState({ codeExpand: !this.state.codeExpand });
  }

  handleClick = (e) => {
    const togglePreview = this.props.togglePreview;
    const { index } = this.props;

    if (e.target.className !== 'collapse anticon anticon-circle-o-right') {
      togglePreview({
        index,
      });
    }
  }

  render() {
    const { id, className, meta, intro, style,
            highlightedCode, highlightedStyle, pathname, role } = this.props;
    const codeExpand = this.state.codeExpand;
    const codeBoxClass = classNames({
      'code-box': true,
      [className]: className,
      expand: codeExpand,
    });

    const introChildren = utils.jsonmlToComponent(pathname, ['div'].concat(intro));
    return (
      <section className={codeBoxClass} id={id} onClick={ this.handleClick }>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Link to={{ pathname, query: { scrollTo: id } }}>
              { meta.title }
            </Link>
          </div>
          { introChildren }
          {
          role === 'engineer' &&
          <span className="collapse anticon anticon-circle-o-right"
            onClick={this.handleCodeExapnd}
            unselectable="none" />
          }
        </section>
        <section className={`highlight-wrapper ${codeExpand ? 'highlight-wrapper-expand' : ''}`}
          key="code">
          <div className="highlight">
            <pre>
              <code className="javascript" dangerouslySetInnerHTML={{
                __html: highlightedCode,
              }} />
            </pre>
          </div>
          {
            style ?
              <div key="style" className="highlight">
                <pre>
                  <code className="css" dangerouslySetInnerHTML={{
                    __html: highlightedStyle,
                  }} />
                </pre>
              </div> :
              null
          }
        </section>
      </section>
    );
  }
}
