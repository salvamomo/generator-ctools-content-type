<?php

/**
 * @file
 * <%= ct_machine_name %> plugin file.
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'single' => TRUE,
  'title' => t('<%= ct_title %>'),
  'description' => t('<%= ct_description %>'),
  'category' => t('<%= ct_category %>'),
  'defaults' => array(),
  'render callback' => '<%= ct_machine_name %>_content_type_render',<% if (ct_edit_form) { %>
    'edit form' => '<%= ct_machine_name %>_settings_form' => t('<%= ct_title %> - Settings'),<% } %><% if (ct_context) { %>
    'required context' => array(
      new ctools_context_required(t('<%= ct_context %>'), 'any'),
    ),
  <% } %>);

/**
 * Output function for the '<%= ct_machine_name %>' content type.
 */
function <%= ct_machine_name %>_content_type_render($subtype, $conf, $panel_args, $context) {<% if (ct_context) { %>
  if (!$context[0]->data) {
    return;
  }
  $context_object = $context[0]->data;
  <% } %>

  $block = new stdClass();
  $block->title = '';
  $output = '';

  $block->content = array(
    '#markup' => render($output),
  );
  return $block;
}
<% if (ct_admin_title) { %>
/**
 * Returns the administrative title for <%= ct_machine_name %>.
 */
function <%= ct_machine_name %>_content_type_admin_title($subtype, $conf) {
  return t('<%= ct_title %>');
}
<% } %><% if (ct_edit_form) { %>
/**
 * Returns an edit form for custom content type settings.
 */
function <%= ct_machine_name %>_settings_form($form, &$form_state) {
  $conf = $form_state['conf'];
  return $form;
}

/**
 * Submit handler for the custom type settings form.
 */
function <%= ct_machine_name %>_settings_form_submit($form, &$form_state) {
  $form_state['conf'] = array_merge($form_state['conf'], array_filter($form_state['values']));
}
<% } %><% if (ct_admin_info) { %>
/**
 * Returns the administrative title for <%= ct_machine_name %>.
 */
function <%= ct_machine_name %>_content_type_admin_info($subtype, $conf) {
  return t('<%= ct_title %>');
}<% } %>
