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
    // Add default posts and comments RSS feed links to <head>.
    add_theme_support( 'automatic-feed-links' );
}
add_action( 'after_setup_theme', 'jvs_theme_setup' );

/**
 * Enqueue required scripts
 *
 * @return void
 */
function jvs_enqueue_scripts() {
    // Enqueue jQuery
    wp_enqueue_script( 'jquery' );

    // Enqueue custom theme scripts in footer
    wp_enqueue_script( 'custom-scripts', get_template_directory_uri() . '/js/script.min.js', array( 'jquery' ), false, true );
    
    // Loads main stylesheet.
    wp_enqueue_style( 'jvs-styles', get_stylesheet_uri(), array(), '2013-10-24' );
}
add_action( 'wp_enqueue_scripts', 'jvs_enqueue_scripts' );

// Remove WP version from <head>
remove_action( 'wp_head', 'wp_generator' );

/**
 * Creates a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @param  string $title Default title text for current view.
 * @param  string $sep   Optional separator.
 * @return string        The filtered title.
 */
function jvs_wp_title( $title, $sep ) {
    global $paged, $page;

    if ( is_feed() )
        return $title;

    // Add the site name.
    $title .= get_bloginfo( 'name' );

    // Add the site description for the home/front page.
    $site_description = get_bloginfo( 'description', 'display' );
    if ( $site_description && ( is_home() || is_front_page() ) )
        $title = "$title $sep $site_description";

    // Add a page number if necessary.
    if ( $paged >= 2 || $page >= 2 )
        $title = "$title $sep " . sprintf( 'Page %s', max( $paged, $page ) );

    return $title;
}
add_filter( 'wp_title', 'jvs_wp_title', 10, 2 );

if ( $_SERVER['SERVER_ADDR'] !== '127.0.0.1' ) {

/**
 * Hide dev-only menus if not running on localhost
 *
 * @return void
 */
function jvs_remove_menus() {
    remove_menu_page( 'edit.php?post_type=acf' );
    remove_menu_page( 'cpt_main_menu' );
    remove_submenu_page( 'tools.php', 'wp-migrate-db-pro' );
}
add_action( 'admin_menu', 'jvs_remove_menus', 20 );

}
