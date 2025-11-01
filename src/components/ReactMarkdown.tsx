interface ReactMarkdownProps {
  content: string;
}

export default function ReactMarkdown({ content }: ReactMarkdownProps) {
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-3xl font-bold text-slate-900 mt-10 mb-5">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="text-4xl font-bold text-slate-900 mt-12 mb-6">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('---')) {
        elements.push(<hr key={key++} className="my-8 border-slate-200" />);
      } else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-4"></div>);
      } else {
        const formatted = formatInlineMarkdown(line);
        elements.push(
          <p key={key++} className="text-slate-700 leading-relaxed mb-4">
            {formatted}
          </p>
        );
      }
    }

    return elements;
  };

  const formatInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let currentText = text;
    let key = 0;

    const patterns = [
      { regex: /\*\*(.+?)\*\*/g, component: (match: string) => <strong key={key++}>{match}</strong> },
      { regex: /\*(.+?)\*/g, component: (match: string) => <em key={key++}>{match}</em> },
      { regex: /_(.+?)_/g, component: (match: string) => <em key={key++}>{match}</em> },
    ];

    while (currentText.length > 0) {
      let earliestMatch: { index: number; length: number; component: JSX.Element } | null = null;

      patterns.forEach(({ regex, component }) => {
        regex.lastIndex = 0;
        const match = regex.exec(currentText);
        if (match && (earliestMatch === null || match.index < earliestMatch.index)) {
          earliestMatch = {
            index: match.index,
            length: match[0].length,
            component: component(match[1]),
          };
        }
      });

      if (earliestMatch) {
        if (earliestMatch.index > 0) {
          parts.push(currentText.slice(0, earliestMatch.index));
        }
        parts.push(earliestMatch.component);
        currentText = currentText.slice(earliestMatch.index + earliestMatch.length);
      } else {
        parts.push(currentText);
        break;
      }
    }

    return parts;
  };

  return <div className="markdown-content">{parseMarkdown(content)}</div>;
}
