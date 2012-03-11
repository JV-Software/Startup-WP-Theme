<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo('charset'); ?>" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name') ?> RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
        <link rel="alternate" type="text/xml" title="<?php bloginfo('name') ?> RSS .92" href="<?php bloginfo('rss_url'); ?>" />
        <link rel="alternate" type="application/atom+xml" title="<?php bloginfo('name') ?> Atom 0.3" href="<?php bloginfo('atom_url'); ?>" />
        <title>
        <?php
            if ( is_home() || is_front_page() ) { bloginfo('name'); echo ' | '; bloginfo('description'); }
            elseif ( is_search() ) { bloginfo('name'); echo ' | Results for: ' . wp_specialchars($s); }
            elseif ( is_404() ) { bloginfo('name'); echo ' | Not found'; }
            else { bloginfo('name'); wp_title(' | '); }
        ?>
        </title>
        <?php wp_head(); ?>
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>"  />
    </head>
    <body <?php body_class(); ?>>
		
	
    <?php wp_footer(); ?>
	</body>
</html>