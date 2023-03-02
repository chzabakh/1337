/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/24 15:54:34 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/14 14:44:07 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fractol.h"

void	ft_menu(void)
{
	system("clear");
	ft_putendl("\033[3;33m \n\tMenu\n");
	ft_putendl("\033[0;33m \n\nArrow Up     :  Move map up");
	ft_putendl("\033[0;33m \n\nArrow Down   :  Move map down");
	ft_putendl("\033[0;33m \n\nArrow Left   :  Move map left");
	ft_putendl("\033[0;33m \n\nArrow Right  :  Move map right");
	ft_putendl("\033[0;33m \n\n+ or -       :  iteration");
	ft_putendl("\033[0;33m \n\n* or /       :  psychedelic effect");
	ft_putendl("\033[0;33m \n\npage up/down :  RGB");
	ft_putendl("\033[0;33m \n\nright click  :  fix julia");
}

void	ft_error(void)
{
	ft_putendl("usage: ./fractol [fractal name]");
	ft_putendl("fractals list:\n\n-mandelbrot.\n-julia.\n-tricorn.");
	ft_putendl("-multibrot\n-5brot\n-burningship");
	exit(0);
}

int		main(int argc, char **argv)
{
	t_mlx	m;

	m.index = 0;
	m.zm = 4;
	if (argc != 2)
		ft_error();
	m.index = ft_strcmp(argv[1], "mandelbrot") == 0 ? 1 : m.index;
	m.index = ft_strcmp(argv[1], "julia") == 0 ? 2 : m.index;
	m.index = ft_strcmp(argv[1], "tricorn") == 0 ? 3 : m.index;
	m.index = ft_strcmp(argv[1], "multibrot") == 0 ? 4 : m.index;
	m.index = ft_strcmp(argv[1], "5brot") == 0 ? 5 : m.index;
	m.index = ft_strcmp(argv[1], "burningship") == 0 ? 6 : m.index;
	if (m.index == 0)
		ft_error();
	ft_menu();
	ft_image(&m);
	return (0);
}
