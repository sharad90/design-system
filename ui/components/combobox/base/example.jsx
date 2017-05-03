// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React from 'react';
import { ListboxPill } from '../../pills/listbox-of-pill-options/example';
import { ButtonIcon } from '../../button-icons/base/example';
import { Avatar } from '../../avatar/base/example';
import { FormElement } from '../../form-element/base/example';
import { Input } from '../../input/base/example';
import { Popover } from '../../popovers/base/example';
import { StandardIcon } from '../../icons/standard/example';
import { UtilityIcon } from '../../icons/base/example';
import SvgIcon from '../../../shared/svg-icon';
import classNames from 'classnames';
import _ from 'lodash';

/* -----------------------------------------------------------------------------
    Variables
----------------------------------------------------------------------------- */

const listboxId = 'listbox-unique-id';
const listboxSelectionsId = 'listbox-selections-unique-id';
const comboboxId = 'combobox-unique-id';
const listboxOptionId01 = 'listbox-option-unique-id-01';
const listboxOptionId02 = 'listbox-option-unique-id-02';

/**
* Generic Listbox container
* @name Listbox
* @prop {string}  id - Unique ID of listbox, targetted by the combobox container
* @prop {string}  className - A CSS class for the outer element
* @prop {boolean} vertical - Vertical Orientation
* @prop {boolean} horizontal - Horizontal Orientation
* @prop {boolean} inline - Horizontal Orientation but inlined with adjacent elements
* @prop {string}  aria-label -
*/
export let Listbox = props =>
  <ul
    id={props.id || listboxId}
    className={classNames(
      'slds-listbox',
      {
        'slds-listbox--vertical': props.vertical,
        'slds-listbox--horizontal': props.horizontal,
        'slds-listbox--inline': props.inline
      },
      props.className
    )}
    role="listbox"
    aria-orientation={props.horizontal || props.inline ? 'horizontal' : null}
    aria-label={props['aria-label']}
  >
    {props.children}
  </ul>;

/**
* Generic list item within a listbox
* @name ListboxItem
* @prop {string}  className - A CSS class for the outer element
*/
export let ListboxItem = props =>
  <li
    role="presentation"
    className={classNames('slds-listbox__item', props.className)}
  >
    {props.children}
  </li>;

/**
* Generic listbox option within a listbox
* @name ListboxItemOption
* @prop {string}  className - A CSS class for the outer element
*/
export let ListboxOption = props =>
  <span
    id={props.id || 'listbox-option-unique-id'}
    className={classNames(
      'slds-media slds-listbox__option',
      {
        'slds-listbox__option--plain': props.type === 'plain',
        'slds-listbox__option--entity': props.type === 'entity'
      },
      props.className
    )}
    role="option"
  >
    {props.children}
  </span>;

/**
* Combobox container for text input, text input icons, listbox of options,
* listbox of pill options and object switcher.
* @name ComboboxContainer
* @prop {string}  id
* @prop {string}  className - A CSS class for the element containing the input
* @prop {string}  containerClassName - A CSS class for the element containing the input and listbox
* @prop {string}  formClassName - A CSS class for the form element
* @prop {string}  formControlClassName - A CSS class for the form element control
* @prop {boolean} isOpen
* @prop {boolean} selectedOptionsInline - Specifies that the listbox of pill options are displayed inlined to its adjacent elements
* @prop {boolean} objectSwitcherInline - Specifies that the object switcher is displayed inlined to its adjacent elements
* @prop {string}  inputIcon - Specifies the position of an input icon
* @prop {string}  inputIconLeftSprite
* @prop {string}  inputIconLeftSymbol
* @prop {string}  inputIconRightSymbol
* @prop {boolean} inputButtonIcon
* @prop {string}  value
* @prop {boolean} autocomplete
* @prop {boolean} readonly
* @prop {string}  tabIndex
* @prop {string}  aria-controls
* @prop {boolean} hideLabel
* @prop {string}  placeholder
*/
export let ComboboxContainer = props =>
  <div className={classNames('slds-form-element', props.formClassName)}>
    <label
      className={classNames(
        'slds-form-element__label',
        { 'slds-assistive-text': props.hideLabel }
      )}
      htmlFor={props.id || comboboxId}
    >
      { props.label || 'Search' }
    </label>
    {/* Form Element Control */}
    <div
      className={classNames(
        'slds-form-element__control',
        props.formControlClassName
      )}
    >
      {/* Combobox container */}
      <div
        className={classNames(
          'slds-combobox_container',
          {
            'slds-has-inline-listbox': props.selectedOptionsInline,
            'slds-has-object-switcher': props.objectSwitcherInline
          },
          props.containerClassName
        )}
      >
        {/* Search icon before the listbox of selected items */}
        { props.inputIcon === 'left' && props.selectedOptionsInline
          ? <SvgIcon
            className="slds-icon slds-icon--x-small slds-combobox_container__icon"
            sprite="utility"
            symbol="search"
          />
        : null }
        {/* Show object switcher here */}
        { props.objectSwitcher ? <ObjectSwitcher /> : null }
        {/* If inline listbox - Show selected options here */}
        { props.selectedOptionsInline ? props.children : null }
        {/* Combobox - role=combobox */}
        <div
          className={classNames(
            'slds-combobox',
            {
              'slds-dropdown-trigger slds-dropdown-trigger_click': !props.staticListbox,
              'slds-is-open': props.isOpen
            },
            props.className
          )}
          aria-expanded={props.isOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
          role="combobox"
        >
          <div
            className={classNames(
              'slds-combobox__form-element',
              {

                'slds-input-has-icon slds-input-has-icon--left': props.inputIcon === 'left',
                'slds-input-has-icon slds-input-has-icon--right': props.inputIcon === 'right',
                'slds-input-has-icon slds-input-has-icon--left-right': props.inputIcon === 'both'
              },
              props.inputContainerClassName
            )}
          >
            {/*
              If inputIcon is on both sides of input AND a standard sprite,
              Makes autocomplete single selection look like a pill
            */}
            {props.inputIcon === 'both' && props.inputIconLeftSprite === 'standard'
            ? <StandardIcon
              containerClassName="slds-combobox__input-entity-icon"
              className="slds-icon--small"
              symbol={props.inputIconLeftSymbol || 'account'}
              title={props.inputIconLeftSymbol || 'account'}
              assistiveText={props.inputIconLeftSymbol + ' ' + props.value || 'account ' + props.value}
              />
            : (props.inputIcon === 'left' || props.inputIcon === 'both'
              ? <UtilityIcon
                containerClassName="slds-input__icon slds-input__icon--left"
                className="slds-icon slds-icon--x-small slds-icon-text-default"
                symbol={props.inputIconLeftSymbol || 'search'}
              />
            : null)}
            {/* Input */}
            <Input
              className="slds-combobox__input"
              id={props.id || comboboxId}
              aria-activedescendant={props['aria-activedescendant']}
              aria-autocomplete={props.autocomplete ? 'list' : null}
              aria-controls={props['aria-controls'] || listboxId}
              autoComplete="off"
              role="textbox"
              type="text"
              placeholder={!props.placeholder ? (props.autocomplete ? 'Search Salesforce' : 'Select an Option') : props.placeholder}
              readOnly={props['readonly'] || props.value}
              value={props.value}
              tabIndex={props.tabIndex}
            />
            {/* If inputIcon is right, show icon here  */}
            { props.inputIcon === 'right' && props.inputButtonIcon != true
              ? <UtilityIcon
                containerClassName="slds-input__icon slds-input__icon--right"
                className="slds-icon slds-icon--x-small slds-icon-text-default"
                symbol={props.inputIconRightSymbol || 'search'}
              />
            : null }
            {/* If close button, show buttonIcon here */}
            { props.inputButtonIcon && props.inputIconRightSymbol === 'close'
              ? <ButtonIcon
                className="slds-input__icon slds-input__icon--right"
                symbol="close"
                title="Remove selected option"
                assistiveText="Remove selected option"
              />
            : null }
          </div>
          {/* Pass listbox into combobox here */}
          { props.listbox }
        </div>
      </div>
      {/* If NOT inline listbox - Show selected options here */}
      { !props.selectedOptionsInline ? props.children : null }
    </div>
  </div>;

/**
* An entity option is a type of listbox option, it contains a standard icon,
* a result name and an optional second line of text that sits below the result name
* @name EntityOption
* @prop {string}  id
* @prop {string}  className
* @prop {boolean} selected
* @prop {boolean} focused
* @prop {boolean} entityMeta - A secondary line of additional information below the result name
* @prop {string}  entityType - Type of entity, such as account or lead
* @prop {string}  entityTitle - Name of result
* @prop {string}  entityLocation - Physical location of entity, such as 'San Francisco'
*/
export let EntityOption = props =>
  <ListboxOption
    type="entity"
    id={props.id}
    className={classNames(
      {
        'slds-media--center': !props.entityMeta,
        'slds-listbox__option--has-meta': props.entityMeta,
        'slds-is-selected': props.selected,
        'slds-has-focus': props.focused
      },
      props.className
    )}
  >
    <span className="slds-media__figure">
      <StandardIcon
        className="slds-icon--small"
        symbol={props.entityType || 'account'}
      />
    </span>
    <span className="slds-media__body">
      <span className="slds-listbox__option-text slds-listbox__option-text--entity">
        { props.typeahead ? props.children : props.entityTitle || 'Salesforce.com, Inc.' }
      </span>
      { props.entityMeta
        ? <span className="slds-listbox__option-meta slds-listbox__option-meta--entity">
        { _.upperFirst(props.entityType) || 'Account' } &bull; { _.upperFirst(props.entityLocation) || ' San Francisco' }
        </span>
      : null }
    </span>
  </ListboxOption>;

/**
* A plain option is a type of listbox option, it contains a string of text and
* a tick mark to show an option has been selected
* @name Option
* @prop {string}  id
* @prop {string}  className
* @prop {boolean} selected
* @prop {boolean} focused
* @prop {string}  title
*/
export let Option = props =>
  <ListboxOption
    type="plain"
    id={props.id}
    className={classNames(
      'slds-media--small slds-media--center',
      {
        'slds-is-selected': props.selected,
        'slds-has-focus': props.focused
      },
      props.className
    )}
  >
    { !props.hideIcon
      ? <span className="slds-media__figure">
        <SvgIcon
          className="slds-icon slds-icon--x-small slds-listbox__icon-selected"
          sprite="utility"
          symbol="check"
        />
      </span>
    : null }
    <span className="slds-media__body">
      <span className="slds-truncate" title={props.title}>
        { props.selected ? <span className="slds-assistive-text">Current Selection:</span> : null } { props.title }
      </span>
    </span>
  </ListboxOption>;

/**
* Object switcher is a popup menu button, its visually displayed inlined with
* its adjacent objects. A "polymorphic" combobox example uses this.
* @name ObjectSwitcher
* @prop {string}  className
*/
let ObjectSwitcher = props =>
  <div className={classNames(
    'slds-listbox--object-switcher slds-dropdown-trigger slds-dropdown-trigger--click',
    props.className
  )}>
    <button
      className="slds-button slds-button--icon"
      aria-haspopup="true"
      title="Select object to search in"
    >
      <span className="slds-icon_container slds-icon-standard-account" title="Accounts">
        <SvgIcon className="slds-icon slds-icon--small" sprite="standard" symbol="account" />
        <span className="slds-assistive-text">Searching in: Accounts</span>
      </span>
      <SvgIcon
        className="slds-button__icon slds-button__icon--x-small"
        sprite="utility"
        symbol="down"
      />
    </button>
  </div>;

/* -----------------------------------------------------------------------------
    Private
----------------------------------------------------------------------------- */

const ListboxDropdown = props =>
  <Listbox className="slds-dropdown slds-dropdown--fluid" vertical>
    <ListboxItem>
      <EntityOption
        id={listboxOptionId01}
        entityTitle="Acme"
        entityMeta
        focused={props.focused}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={listboxOptionId02}
        entityTitle="Salesforce.com, Inc."
        entityMeta
      />
    </ListboxItem>
  </Listbox>;

const ListboxList = props =>
  <Listbox className="slds-dropdown--length-10" vertical={true}>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="Acme"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="Edge SLA"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="Express Logistics SLA"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="GenePoint Lab Generators"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="GenePoint SLA"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="Pyramid Emergency Generators"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="United Oil Installations"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="United Oil Plant Standby Generators"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="United Oil SLA"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="United Oil Standby Generators"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="University of AZ Installations"
        entityMeta={true}
      />
    </ListboxItem>
    <ListboxItem>
      <EntityOption
        id={_.uniqueId('listbox-option-id-')}
        entityTitle="University of AZ Portable Generators"
        entityMeta={true}
      />
    </ListboxItem>
  </Listbox>;

/* -----------------------------------------------------------------------------
    Exports
----------------------------------------------------------------------------- */

// Default
export default (
  <div className="demo-only" style={{ height: '10rem' }}>
    <ComboboxContainer
      autocomplete={true}
      inputIcon="right"
      inputIconRightSymbol="search"
      listbox={<ListboxDropdown />}
    />
  </div>
);

// States
export let states = [
  {
    id: 'focused',
    label: 'Focused',
    element:
      <div className="demo-only" style={{ height: '10rem' }}>
        <ComboboxContainer
          isOpen={true}
          autocomplete={true}
          inputIcon="right"
          inputIconRightSymbol="search"
          listbox={<ListboxDropdown />}
        />
      </div>,
    script: `
      document.getElementById('combobox-unique-id').focus()
    `
  },
  {
    id: 'open-item-focused',
    label: 'Open - Item Focused',
    element:
      <div className="demo-only" style={{ height: '10rem' }}>
        <ComboboxContainer
          isOpen={true}
          autocomplete={true}
          inputIcon="right"
          inputIconRightSymbol="search"
          listbox={<ListboxDropdown focused={true} />}
          aria-activedescendant={listboxOptionId01}
        />
      </div>
  },
  {
    id: 'closed-options-selected',
    label: 'Option(s) Selected',
    element:
      <div className="demo-only" style={{ height: '10rem' }}>
        <ComboboxContainer
          inputIcon="right"
          inputIconRightSymbol="search"
          autocomplete={true}
          listbox={<ListboxDropdown />}
        >
          <Listbox
            id={listboxSelectionsId}
            aria-label="Selected Options:"
            className="slds-p-top--xxx-small"
            horizontal={true}
          >
            <ListboxItem>
              <ListboxPill label="Acme" tabIndex="0">
                <Avatar className="slds-avatar--x-small slds-pill__icon_container">
                  <StandardIcon />
                </Avatar>
              </ListboxPill>
            </ListboxItem>
            <ListboxItem>
              <ListboxPill label="Salesforce.com, Inc.">
                <Avatar className="slds-avatar--x-small slds-pill__icon_container">
                  <StandardIcon />
                </Avatar>
              </ListboxPill>
            </ListboxItem>
          </Listbox>
        </ComboboxContainer>
      </div>
  }
];

// Examples
export let examples = [
  {
    id: 'non-modal-dialog',
    label: 'Non-modal Dialog',
    element:
      <Popover
        className="slds-nubbin--top-left"
        bodyClassName="slds-p-horizontal--none"
      >
        <ComboboxContainer
          autocomplete={true}
          isOpen={true}
          hideLabel={true}
          inputIcon="right"
          inputIconRightSymbol="search"
          formControlClassName="slds-m-around--small"
          listbox={<ListboxList />}
          staticListbox={true}
        />
      </Popover>
  }
];