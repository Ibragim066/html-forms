/* eslint-disable linebreak-style */
import Editor from './Editor/Editor';
import Popover from './Popover/Popover';

const popover = new Popover();
popover.bindToDOM(document.querySelector('#popover-container'));

const editor = new Editor();
editor.bindToDOM(document.querySelector('#editor-container'));
