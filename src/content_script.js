walk(document.body);

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  var tagName = node.tagName ? node.tagName.toLowerCase() : "";
  if (tagName == "input" || tagName == "textarea") {
    return;
  }
  if (node.classList && node.classList.contains("ace_editor")) {
    return;
  }

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(/,?.?et al./g, " & the gang");
  v = v.replace(/,?.?Et al./g, " & the Gang");
  v = v.replace(/,?.?Et Al./g, " & the Gang");
  v = v.replace(/,?.?ET AL./g, " & THE GANG");
  // v = v.replace(/\bThe cloud\b/g, "My butt");
  // v = v.replace(/\bthe Cloud\b/g, "my Butt");
  // v = v.replace(/\bthe cloud\b/g, "my butt");

  textNode.nodeValue = v;
}
