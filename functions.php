<?php
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 * 
 * @return void
 */
function jvs_theme_setup() {
    // Enqueue jQuery
    wp_enqueue_script('jquery');

    // Add default posts and comments RSS feed links to <head>.
    add_theme_support( 'automatic-feed-links' );
}
add_action('after_setup_theme', 'jvs_theme_setup');

/**
 * Remove WP version from <head>
 * 
 * @return string Empty string
 */
function jvs_remove_version() {
    return '';
}
add_filter('the_generator', 'jvs_remove_version');